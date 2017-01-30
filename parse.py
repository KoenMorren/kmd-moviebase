import json
import os
import re
from os.path import dirname, isdir, isfile, join
from urllib.parse import urlencode
from urllib.request import urlopen

def main():
    _path = requestPath('Please specify the root-folder address. This will be the entry point of the search:\n')
    _ids = parseFolderStructure(_path)

    storeIdsInFile(_ids)
    
"""
This function prompts the user to specify the filepath as to where the search
should start.
As long as the path is invalid, this method will keep looping.
"""
def requestPath(question):
    _isdir = False
    while (_isdir != True):    
        _input = input(question)
        _isdir = isdir(_input)
        
    return _input

"""
This function loops over the folders in the given path and attempts to find a
IMDB-Id for each movie that exists here.
Upon finding the IMDB-Id, a .id-file will be added to the folder if not yet present.
"""
def parseFolderStructure(path):
    _ids = []
    
    for dirInfo in os.walk(path):
        # This statement is needed to skip the root-folder
        if (dirInfo[0] != path):
            _path,_dirName = os.path.split(dirInfo[0])

            # Check if there is a .id file in this folder
            _idFile = [x for x in dirInfo[2] if '.id' in x]
            if(len(_idFile) == 1):
                _ids.append(_idFile[0][:-3])
            else:
                _title = parseTitleFromFolderName(_dirName)
                print(_title)
                _id = getIDForTitle(_title)
                addIDFile(dirInfo[0], _id)
                _ids.append(_id)

    return _ids

"""
In general, the name of the folder is the title of the movie with both quality
and release year specified. This function returns only the title.
"""
def parseTitleFromFolderName(folderName):
    _metaInfoMatches = re.findall(r"(\[|\()(\d{3}|\d{4})([p]?)(\]|\))", folderName)
    for match in _metaInfoMatches:
        folderName = folderName.replace(''.join(match), '')

    return folderName.strip()

"""
    Writes an .id-file to disk.
"""
def addIDFile(path, imdbId):
    _completePath = join(path, imdbId + '.id')
    _file = open(_completePath, 'w')
    _file.close()

"""
Search the OMDB database to find a match for the given title.
If only 1 match is found, return the corresponding IMDB-Id.
If more matches are found, prompt the user to select the correct record.
"""
def getIDForTitle(title):
    _url = 'http://www.omdbapi.com/?'
    _query = {}
    _query['s'] = title
    _query['type'] = 'movie'
    
    uh = urlopen(_url + urlencode(_query))
    data = uh.read().decode('utf-8')
    obj = json.loads(data)

    if(obj['Response'] == 'False'):
        return promptUserForId()
    if(int(obj['totalResults']) == 1):
        print(obj['Search'][0]['imdbID'])
        return obj['Search'][0]['imdbID']
    else:
        return promptUserForSelection(obj['Search'])

"""
Print a list of all received search results and allow the user to select the
correct one via keyboard input.
Return the imdbID of the selected result.
"""
def promptUserForSelection(searchResults):
    # Print list of results
    for index, result in enumerate(searchResults):
        print(str(index + 1).zfill(2) + ' - [' + result['imdbID'] + '] ' + result['Title'])
    print('00 - Other result')

    # Parse user input
    _input = int(input(''))
    if(_input == 0):
        return promptUserForId()
    else:
        _input = _input - 1
        return searchResults[_input]['imdbID'] 
        
"""
"""
def promptUserForId():
    # TODO: check if user has entered the correct id?
    _input = input('Please specify the IMDB-Id:')
    return _input

"""
"""
def storeIdsInFile(ids):
    _path = requestPath('Please specify the path where the file should stored:\n')
    _file = open(os.path.join(_path, 'test.txt'), 'w')
    _file.write(';'.join(ids))
    _file.close()

    print('File has been correctly stored at ', _path, '.')

main()
