const mainPage = document.querySelector('.main')
const sideBar = document.querySelector('.ls-navigation')
const closeBut = document.querySelector('#closeBut');
const makeOrderBut = document.querySelector('#makeOrder');
const myOrdersBut = document.querySelector('#ordersBut');
const financeBut = document.querySelector('#finance');
const supportBut = document.querySelector('#support');
const profileBut = document.querySelector('#profileBut');
const faqBut = document.querySelector('#faq');
const twitBut = document.querySelector('#twitter');
const instBut = document.querySelector('#inst');
const faceBut = document.querySelector('#faceb');
const whatsBut = document.querySelector('#whatsapp');


closeBut.addEventListener('click', (e) => {
  sideBar.style = 'visibility: hidden;'
  mainPage.style = 'margin-left: 30px'
})

makeOrderBut.addEventListener('click', (e) => {
  window.location = ('/orders/form')
})
myOrdersBut.addEventListener('click', (e) => {
  window.location = ('/orders')
})
financeBut.addEventListener('click', (e) => {
  window.location = ('/finance')
})
supportBut.addEventListener('click', (e) => {
  window.location = ('/tickets')
})
profileBut.addEventListener('click', (e) => {
  window.location = ('/users')
})
faqBut.addEventListener('click', (e) => {
  window.location = ('/faq')
})
twitBut.addEventListener('click', (e) => {
  window.location = ('https://twitter.com/')
})
instBut.addEventListener('click', (e) => {
  window.location = ('https://instagram.com/')
})
faceBut.addEventListener('click', (e) => {
  window.location = ('https://facebook.com/')
})
whatsBut.addEventListener('click', (e) => {
  window.location = ('https://twitter.com/')
})