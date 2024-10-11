import requests
from bs4 import BeautifulSoup
import json

baseUrl = 'https://oldschool.runescape.wiki/w/Music'
songUrl = 'https://oldschool.runescape.wiki'
dataPath = './../fremennik-philharmonic-duo/src/data/'

def scrape_wiki():
    # Get the URL
    r = requests.get(baseUrl)
    
    # Parse the request's content
    soup = BeautifulSoup(r.content, 'html.parser')

    # Find the target table
    result = soup.find('table', {"class": "wikitable sortable lighttable embed-audio-links qc-active music-tracks sticky-header"})
    
    data = []
    rows = result.find_all('tr')[1:]    # first row is empty
    
    data_id = 0
    
    # Search each row for desired information
    for row in rows:
        print("Processing row " + str(data_id))
        # Find the table data for each row
        cols = row.find_all('td')
        # For the last row, grab the associated href attribute in the a tag
        song_id = cols[-1].a['href']
        # Create the target URL
        targetUrl = songUrl + song_id
        # Request the target URL
        r_2 = requests.get(targetUrl)
        # Parse the request's content
        soup_2 = BeautifulSoup(r_2.content, 'html.parser')
        # Find the audio tag with id='mwe_player_0
        result_2 = soup_2.find('audio', {'id': 'mwe_player_0'})
        # Get the first child-source element's src attribute
        id = result_2.source['src']
        # Create the song URL
        final_url = songUrl + id        
        # Save the entire row's text
        cols = [ele.text.strip() for ele in cols]
        # We're only interested in the song name and its url
        data.append({'title': cols[0], 'url': final_url, 'id': data_id})
        data_id += 1
    
    # json_data = json.dumps(data, indent=4)
    # Write the json data to a file
    with open(dataPath + 'data2.json', 'w') as f:
        json.dump(data, f, indent=4)
    
   

if __name__ == "__main__":
    scrape_wiki()