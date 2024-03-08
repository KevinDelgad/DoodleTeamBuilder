import json
import requests
from bs4 import BeautifulSoup

type_list =[
    "Basic Type",
    "Fire Type",
    "Water Type",
    "Plant Type",
    "Spark Type",
    "Beast Type",
    "Air Type",
    "Insect Type",
    "Earth Type",
    "Mind Type",
    "Melee Type",
    "Food Type",
    "Light Type",
    "Crystal Type",
    "Metal Type",
    "Spirit Type",
    "Ice Type",
    "Dark Type",
    "Poison Type",
    "Mythic Type"
]

def scrapeDoodleMoves(doodleName):
    allmoves = []

    try:
        site = "https://doodle-world.fandom.com/wiki/" + doodleName
        r = requests.get(site)
        soup = BeautifulSoup(r.content, features="html.parser")
        table = soup.find(class_='article-table sortable mw-collapsible mw-collapsed')
        links = table.find_all('a')
        for result in links:
            if(result["title"] not in type_list):
                allmoves.append(result["title"])
    except:
        return scrapeDoodleMoves(doodleName[0:-2])
    return allmoves


def scrapeDoodleMoveHelper():
    f = open("public/data/doodleSpecificMoves.json", "w",  encoding="utf-8")
    with open("public/data/doodles.json") as jsonFile:
        doodleMoveList = {}
        data = json.load(jsonFile)
        finishedDoodles = len(data["DoodleData"])
        for name in data["DoodleData"]:
            print(finishedDoodles)
            doodleMoveList[name] = scrapeDoodleMoves(name)
            finishedDoodles -= 1

        f.write(json.dumps(doodleMoveList, ensure_ascii=False))

def scrapeAllDoodleMoves():
    typeCounter = 0
    typeMoveList = {}
    url = "https://doodle-world.fandom.com/wiki/Moves"
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    table = soup.find_all('table')
    for foundTable in table:
        tableBody = foundTable.find('tbody')
        sections = tableBody.find_all('td')

        counter = 0
        tempMoveList =[]
        for section in sections:
            if(counter % 7 == 0):
                moveLink = section.select('a[title]')
                tempMoveList.append(moveLink[0].get('title'))
            counter +=1
        typeMoveList[type_list[typeCounter].split(" ")[0]] = tempMoveList
        typeCounter += 1

    with open("public/data/allMoves.json", "w",  encoding="utf-8") as temp:
        temp.write(json.dumps(typeMoveList, ensure_ascii=False))

scrapeAllDoodleMoves()
scrapeDoodleMoveHelper()

        
