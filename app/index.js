import document from 'document'

const elTypes = ['line', 'rect', 'gradR', 'circle', 'arc', 'gradA', 'text', 'RGB', 'RBGA', 'grey', 'greyA']
const skipMask = [0    , 0     , 1      , 0       , 0    , 1      , 0     , 1    , 0     , 1     , 0]  // whether elType should not be used as a mask
const unmaskEl = document.getElementById('unmask')
const unmaskEls = unmaskEl.getElementsByClassName('unmaskEl')
const maskEl = document.getElementById('mask')
const maskEls = maskEl.getElementsByClassName('maskEl')
const unmaskedEl = document.getElementById('unmasked')
const unmaskedEls = unmaskedEl.getElementsByClassName('unmaskedEl')
const maskedEl = document.getElementById('masked')
const maskedEls = maskedEl.getElementsByClassName('maskedEl')
const maskedTypeEl = document.getElementById('maskedType')
const maskTypeEl = document.getElementById('maskType')
const underlayEl = document.getElementById('underlay')
const overlayEl = document.getElementById('overlay')
const touchEl = document.getElementById('touch')
let maskedElIndex = 0, maskElIndex = 0

console.log(`${maskEls}`)

touchEl.onclick = evt => {
  if (evt.screenY<100) underlayEl.style.display = underlayEl.style.display==='none'? 'inline' : 'none'
  else if (evt.screenY>236) overlayEl.style.display = overlayEl.style.display==='none'? 'inline' : 'none'
  else if (evt.screenX<118) {  // changed masked element:
    // Disable losing masked:
    unmaskedEls[maskedElIndex].style.display = maskedEls[maskedElIndex].style.display = 'none'

    // Enable gaining masked:
    maskedElIndex = (++maskedElIndex) % maskedEls.length
    unmaskedEls[maskedElIndex].style.display = maskedEls[maskedElIndex].style.display = 'inline'
    maskedTypeEl.text = elTypes[maskedElIndex]
  } else {    // change mask element:
    // Disable losing mask:
    unmaskEls[maskElIndex].style.display = maskEls[maskElIndex].style.display = 'none'

    // Enable gaining mask:
    maskElIndex = (++maskElIndex) % maskEls.length
    while (skipMask[maskElIndex]) maskElIndex++
    unmaskEls[maskElIndex].style.display = maskEls[maskElIndex].style.display = 'inline'
    maskTypeEl.text = elTypes[maskElIndex]
  }
}
