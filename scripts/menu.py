from selenium import webdriver 
from selenium.webdriver.common.by import By 
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions as EC 
from selenium.common.exceptions import TimeoutException
import unicodedata

def waitForElement(xpath, timeout):
    try:
        WebDriverWait(driver, timeout).until(EC.visibility_of_element_located((By.XPATH, xpath)))
    except TimeoutException:
        print("timed out waiting for page to load")
        driver.quit()

def toMilitary(time):
    if time[-2:] == "am":
        return time[:-3]
    elif time[-2:] == "pm":
        index = time.find(':')
        newTime = int(time[:index]) + 12
        return str(newTime) + time[index:-3]

# Environment Variables
timeout = 30
meals = ["Breakfast", "Lunch", "Dinner"]
triesLeft = 10

# Configure WebDriver Settings
option = webdriver.ChromeOptions()
option.add_argument("-incognito")

# Create WebDrivers
driver = webdriver.Chrome(executable_path='./chromedriver', chrome_options=option)
driver.get("https://emoryatlanta.cafebonappetit.com/cafe/duc-ling/")
driver.implicitly_wait(30)
waitForElement("//div[@class='daypart-hours']", timeout)

# Retrieves hours
hours_element = driver.find_elements_by_xpath("//div[@class='daypart-hours']")
hours = [x.text.split('\n')[0].encode('ascii', 'ignore') for x in hours_element]

# Print elements
for meal, hour in zip(meals, hours):
    print("{0}: {1}".format(meal, hour))

# Retrieves basic menus
for meal in meals:
    driver.get("https://emoryatlanta.cafebonappetit.com/cafe/duc-ling/")
    while True:
        try:
            waitForElement("//a[@title='View Additional " + meal + " Favorites']", timeout)

            driver.find_element_by_xpath("//a[@title='View Additional " + meal + " Favorites']").click()
        except Exception:
            if triesLeft > 0:
                triesLeft -= 1
                continue
        break
    waitForElement("//span[@class='bg dotted-leader-content']", timeout)

    # Get food
    basicMenuElement = driver.find_elements_by_xpath("//span[@class='bg dotted-leader-content']")
    basicMenu = [x.text.encode('ascii', 'ignore') for x in basicMenuElement]
    print basicMenu

# Close driver
driver.quit()

hourSplit = []
hourSplitMilitary = []
for hour in hours:
    dashindex = hour.find('-')
    hourSplit.append([hour[:dashindex - 1], hour[dashindex + 2:]])
    hourSplitMilitary.append([toMilitary(hour[:dashindex - 1]), toMilitary(hour[dashindex + 2:])])
print hourSplit
print hourSplitMilitary