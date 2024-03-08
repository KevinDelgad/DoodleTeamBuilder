import json
import requests
from bs4 import BeautifulSoup
import os

def normalDoodleExtract(doodleName, doodleTypeList, doodleImage):
    url = "https://doodle-world.fandom.com/wiki/Doodlepedia"

    page = requests.get(url)

    soup = BeautifulSoup(page.text, "html.parser")

    table = soup.find('table')
    tableBody = table.find('tbody')
    tableSections = tableBody.find_all('td')

    counter = 0
    for section in tableSections:
        if(counter % 5 == 1):
            temp = section.select('img[src]')
            if(temp[0].get('src')[0:4] != "data"):
                pngUrl = temp[0].get('src')[:temp[0].get('src').find(".png/") + 4]
                doodleImage.append(pngUrl)
            else:
                temp = section.select('img[data-src]')
                pngUrl = temp[0].get('data-src')[:temp[0].get('data-src').find(".png/") + 4]
                doodleImage.append(pngUrl)
            
        if(counter % 5 == 2):
            temp = section.select('a[title]')
            doodleName.append(temp[0].get('title'))

        if(counter % 5 == 3):
            temp = section.find_all('a')
            tempList = []
            for doodleType in temp:
                curType = doodleType.get('title')
                cleanedType = curType[:curType.find("Type")]
                tempList.append(cleanedType.strip())   
            doodleTypeList.append(tempList)

        counter+=1


def awakenedDoodleExtract(doodleName, doodleTypeList, doodleImage):
    url = "https://doodle-world.fandom.com/wiki/Awakening?so=search"
    page = requests.get(url)
    soup = BeautifulSoup(page.text, "html.parser")
    table = soup.find("table")
    tableBody = table.find("tbody")
    tableSections = tableBody.find_all('td')
    counter = 0
    for section in tableSections:
        if(counter % 9 == 1):
            temp = section.select('a[title]')
            doodleName.append(temp[0].get('title') + "-A")
        if(counter % 9 == 5):
            temp = section.select('img[src]')
            if(temp[0].get('src')[0:4] != "data"):
                pngUrl = temp[0].get('src')[:temp[0].get('src').find(".png/") + 4]
                doodleImage.append(pngUrl)
            else:
                temp = section.select('img[data-src]')
                pngUrl = temp[0].get('data-src')[:temp[0].get('data-src').find(".png/") + 4]
                doodleImage.append(pngUrl)
        if(counter % 9 == 6):
            temp = section.find_all('a')
            tempList = []
            for doodleType in temp:
                curType = doodleType.get('title')
                cleanedType = curType[:curType.find("Type")]
                tempList.append(cleanedType.strip())   
            doodleTypeList.append(tempList)
        counter +=1
    
def downloadMissingImages(doodleName,doodleImage, imgPath):
    for i in range(0, len(doodleName)):
        curFilePath = "public/doodleImages/" + doodleName[i] + ".webp"
        imgPath.append("/doodleImages/" + doodleName[i] + ".webp")
        if(not os.path.exists(curFilePath)):
            print(i)
            with open(curFilePath, "wb") as writeImg:
                retrievedImg = requests.get(doodleImage[i]).content
                writeImg.write(retrievedImg)
                writeImg.close()



doodleName = []
doodleTypeList = []
doodleImage = []
imgPath = []

compiledData = {"DoodleData":{}}

normalDoodleExtract(doodleName, doodleTypeList, doodleImage)
awakenedDoodleExtract(doodleName, doodleTypeList, doodleImage)
doodleName = doodleName[0:len(doodleName)-1]

downloadMissingImages(doodleName, doodleImage, imgPath)

for i in range(0, len(doodleName)):
    compiledData["DoodleData"][doodleName[i]] = {"Types": doodleTypeList[i], "ImgPath": imgPath[i]}

with open("public/data/doodles.json", "w", encoding="utf-8") as jsonFile:
    json.dump(compiledData, jsonFile, ensure_ascii=False)
