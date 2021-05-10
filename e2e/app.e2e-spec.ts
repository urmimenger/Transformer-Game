import { TransformerWarPage } from './app.po';
import { browser, element, by } from 'protractor';


describe('Transformers Battle (Input) : ', function () {
  let page: TransformerWarPage;

  beforeEach(() => {
    page = new TransformerWarPage();
  });

  it('Incomplete Input', () => {
    page.navigateTo();
    page.getTransformerInputElement().sendKeys("OptimusPrime,A")
    page.getBattleButton().click();
    var alertDialogBox = browser.switchTo().alert();
    expect(alertDialogBox.getText()).toEqual('Enter complete details for OptimusPrime and try again')
    alertDialogBox.accept();
  });

  it('Incorrect Team name', () => {
    page.navigateTo();
    page.getTransformerInputElement().sendKeys("OptimusPrime,C,1,2,3,4,5,6,7,8")
    page.getBattleButton().click();
    var alertDialogBox = browser.switchTo().alert();
    expect(alertDialogBox.getText()).toEqual("Transformers team should either be 'D' or 'A'.Kindly check attributes for  OptimusPrime and try again.")
    alertDialogBox.accept();
  });

  it('Blank Team name', () => {
    page.navigateTo();
    page.getTransformerInputElement().sendKeys("OptimusPrime,,1,2,3,4,5,6,7,8")
    page.getBattleButton().click();
    var alertDialogBox = browser.switchTo().alert();
    expect(alertDialogBox.getText()).toEqual("Transformers name (and/or) team cannot be left blank. Kindly check attributes for  OptimusPrime and try again.")
    alertDialogBox.accept();
  });

  it('Non Number Team attributes', () => {
    page.navigateTo();
    page.getTransformerInputElement().sendKeys("OptimusPrime,A,1,H,3,4,5,6,7,8")
    page.getBattleButton().click();
    var alertDialogBox = browser.switchTo().alert();
    expect(alertDialogBox.getText()).toEqual("Transformers attributes should be a number between 1 to 10. Kindly check attributes for OptimusPrime and try again.")
    alertDialogBox.accept();
  });

  it('Multiple Transformers with second transformer having invalid attribute', () => {
    page.navigateTo();
    page.getTransformerInputElement().sendKeys("OptimusPrime,A,1,2,3,4,5,6,7,8\n")
    page.getTransformerInputElement().sendKeys("Soundwave,D,1,2,13,4,5,6,7,8\n")
    page.getBattleButton().click();
    var alertDialogBox = browser.switchTo().alert();
    expect(alertDialogBox.getText()).toEqual("Transformers attributes should be a number between 1 to 10. Kindly check attributes for Soundwave and try again.")
    alertDialogBox.accept();
  });
});

describe('Transformers Battle (Special cases) : ', function () {
  let page: TransformerWarPage;

  beforeEach(() => {
    page = new TransformerWarPage();
  });

  it('Tie due to same number of wins', () => {
    page.navigateTo();
    page.getTransformerInputElement().sendKeys("Soundwave,D,8,9,2,6,7,5,6,10\n")
    page.getTransformerInputElement().sendKeys("Bluestreak, A, 6,6,7,9,5,2,9,7\n")
    page.getTransformerInputElement().sendKeys("Hubcap, A, 4,4,4,4,4,4,4,4\n")
    page.getTransformerInputElement().sendKeys("Roadbuster, A, 3,9,5,9,6,6,1,10\n")
    page.getTransformerInputElement().sendKeys("Sandstorm, A, 4,9,4,6,6,7,6,9\n")
    page.getTransformerInputElement().sendKeys("Rumble, D, 7,3,4,8,2,8,5,5")
    page.getBattleButton().click();
    var alertDialogBox = browser.switchTo().alert();
    expect(alertDialogBox.getText()).toEqual('Its a tie as both the transformers knocked same number of opponents in 2 battles.')
    alertDialogBox.accept();
  });

  it('Tie due to same deciding attributes', () => {
    page.navigateTo();
    page.getTransformerInputElement().sendKeys("Soundwave,D,8,9,2,6,7,5,6,10\n")
    page.getTransformerInputElement().sendKeys("Bluestreak, A, 8,9,2,6,7,5,6,10\n")
    page.getBattleButton().click();
    var alertDialogBox = browser.switchTo().alert();
    expect(alertDialogBox.getText()).toEqual('Its a tie between Bluestreak and Soundwave.')
    alertDialogBox.accept();
  });

  it('SuperPowers facing each other', () => {
    page.navigateTo();
    page.getTransformerInputElement().sendKeys("OptimusPrime,D,8,9,2,6,7,5,6,10\n")
    page.getTransformerInputElement().sendKeys("Predaking, A, 6,6,7,9,5,2,9,7\n")
    page.getBattleButton().click();
    var alertDialogBox = browser.switchTo().alert();
    expect(alertDialogBox.getText()).toEqual('Fight between Predaking and OptimusPrime. So, no Battle as they are the superpowers.')
    alertDialogBox.accept();
  });

  it('Battle not possible as only single team transformers are there', () => {
    page.navigateTo();
    page.getTransformerInputElement().sendKeys("OptimusPrime,A,8,9,2,6,7,5,6,10\n")
    page.getTransformerInputElement().sendKeys("Predaking, A, 6,6,7,9,5,2,9,7\n")
    page.getBattleButton().click();
    var alertDialogBox = browser.switchTo().alert();
    expect(alertDialogBox.getText()).toEqual('Battle is not possible within single or no team. ')
    alertDialogBox.accept();
  });


});  


describe('Transformers Battle (Real Battle) : ', function () {
  let page: TransformerWarPage;

  beforeEach(() => {
    page = new TransformerWarPage();
  });

  it('Two vs One battle', () => {
    page.navigateTo();
    page.getTransformerInputElement().sendKeys("Soundwave, D, 8,9,2,6,7,5,6,10\n")
    page.getTransformerInputElement().sendKeys("Bluestreak, A, 6,6,7,9,5,2,9,7\n")
    page.getTransformerInputElement().sendKeys("Hubcap, A, 4,4,4,4,4,4,4,4\n")
    page.getBattleButton().click();
    expect(page.getNumberOfBattlesElementValue()).toEqual("1 &nbsp; battle(s)")
    expect(page.getWinnerElementValue()).toEqual("Soundwave")
    expect(page.getSurvivorElementValue()).toEqual("Hubcap.")    
  });

  it('Strength and Courage', () => {
    page.navigateTo();
    page.getTransformerInputElement().sendKeys("Soundwave, D, 8,9,2,6,7,5,6,10\n")
    page.getTransformerInputElement().sendKeys("Bluestreak, A, 2,6,7,9,5,2,9,7\n")
    page.getBattleButton().click();
    expect(page.getNumberOfBattlesElementValue()).toEqual("1 &nbsp; battle(s)")
    expect(page.getWinnerElementValue()).toEqual("Soundwave")
      
  });
  it('Fight with Superpower', () => {
    page.navigateTo();
    page.getTransformerInputElement().sendKeys("Soundwave, D, 8,9,2,6,7,5,6,10\n")
    page.getTransformerInputElement().sendKeys("Bluestreak, A, 2,6,7,9,5,2,9,7\n")
    page.getTransformerInputElement().sendKeys("OptimusPrime, D, 8,9,2,6,7,5,6,10\n")
    page.getTransformerInputElement().sendKeys("Hubcap, A, 2,6,7,9,5,2,9,7\n")
    page.getBattleButton().click();
    expect(page.getNumberOfBattlesElementValue()).toEqual("2 &nbsp; battle(s)")
    expect(page.getWinnerElementValue()).toEqual("OptimusPrime")
      
  });

  it('Mixed cases', () => {
    page.navigateTo();
    page.getTransformerInputElement().sendKeys("Soundwave, D, 8,9,2,6,7,5,6,10\n")
    page.getTransformerInputElement().sendKeys("Brawl, D, 8,9,2,6,7,5,6,10\n")
    page.getTransformerInputElement().sendKeys("Hubcap, A, 2,6,7,9,5,2,9,7\n")
    page.getTransformerInputElement().sendKeys("Bumblebee,A,4,6,2,5,6,7,8,1\n")
    page.getTransformerInputElement().sendKeys("Punch,A,6,5,3,1,1,4,8,2\n")    
    page.getBattleButton().click();
    expect(page.getNumberOfBattlesElementValue()).toEqual("2 &nbsp; battle(s)")
    expect(page.getWinnerElementValue()).toEqual("Brawl")
    expect(page.getSurvivorElementValue()).toEqual("Punch.")  
    
      
  });




});