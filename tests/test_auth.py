import time
from selenium.webdriver.common.by import By

BASE_URL = 'http://localhost:5173/#/auth'

def test_cadastro_sucesso(driver):
    driver.get(BASE_URL)
    driver.execute_script("localStorage.clear()")
    driver.refresh()
    driver.find_element(By.XPATH, "//button[contains(text(), 'Criar conta')]").click()
    driver.find_element(By.CSS_SELECTOR, "input[type='text']").send_keys("Pedro Teste")
    driver.find_element(By.CSS_SELECTOR, "input[type='email']").send_keys("pedro@teste.com")
    driver.find_element(By.CSS_SELECTOR, "input[type='password']").send_keys("123456")
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    time.sleep(1)
    assert '/#/auth' not in driver.current_url

def test_login_sucesso(driver):
    driver.get(BASE_URL)
    driver.execute_script("localStorage.clear()")
    driver.refresh()
    driver.find_element(By.XPATH, "//button[contains(text(), 'Criar conta')]").click()
    driver.find_element(By.CSS_SELECTOR, "input[type='text']").send_keys("Pedro Login")
    driver.find_element(By.CSS_SELECTOR, "input[type='email']").send_keys("pedro@login.com")
    