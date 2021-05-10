import { browser, element, by } from 'protractor';

export class TransformerWarPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getTransformerInputElement()
  {
    return element(by.name('input'));
  }

  getTransformerInputValue()
  {
    return element(by.name('input')).getText();
  }

  getBattleButton()
  {
    return element(by.name('btn'));
  }

  getNumberOfBattlesElementValue()
  {
    return element(by.id('battle')).getInnerHtml();
  }
  getWinnerElementValue()
  {
    return element(by.className("winner")).getText();

  }

  getSurvivorElementValue()
  {
    return element(by.className("survivor")).getText();

  }
  
}
