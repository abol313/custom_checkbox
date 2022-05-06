/*<!--In the name of kindly generous ALLAH-->
<!--Thanks ALLAH-->
*/

const selectors = document.querySelectorAll(".p_radio .selector")
const ons = document.querySelectorAll(".p_radio .on")
const offs = document.querySelectorAll(".p_radio .off")
const animDur = 200
const stepDur = animDur / 100
const fullSelectorWidth = 150
const minSelectorWidth = 50
let isOn = true
let t = isOn ? 100 : 0

const checkBoxes = []
for (let i = 0; i < selectors.length; i++) {
    const checkBox = {}
    checkBox.selector = selectors[i]
    checkBox.on = ons[i]
    checkBox.off = offs[i]
    checkBox.t = t
    checkBox.isOn = isOn
    checkBox.index = i
    checkBox.self = checkBox.selector.parentElement
    checkBox.self.setAttribute("checked", "")

    checkBox.on.addEventListener("click", () => toggleOn(i))
    checkBox.off.addEventListener("click", () => toggleOff(i))
    // checkBox.self.addEventListener("click",()=>{
    //     checkBoxes[i].isOn?toggleOff(i):toggleOn(i)

    // })

    checkBoxes.push(checkBox)
}

for (let checkBox of checkBoxes) {
    if (checkBox.isOn) {
        checkBox.selector.style.right = 0
        checkBox.selector.style.left = 'auto'
    } else {
        checkBox.selector.style.right = 'auto'
        checkBox.selector.style.left = 0
    }
    toggleColor(checkBox.index, isOn)
}

let interval
function toggleOn(index) {
    let checkBox = checkBoxes[index]
    if (checkBox.interval)
        clearInterval(checkBox.interval)
    checkBox.interval = setInterval(() => {
        if (checkBox.t > 100) {
            clearInterval(checkBox.interval)
            return;
        }
        //todo
        render(index, checkBox.t)
        if (checkBox.t >= 50 && !checkBox.isOn) {
            checkBox.isOn = true
            toggleColor(index, checkBox.isOn)
        }
        checkBox.t++
    }, stepDur)
}
function toggleOff(index) {
    let checkBox = checkBoxes[index]
    clearInterval(checkBox.interval)
    checkBox.interval = setInterval(() => {
        if (checkBox.t < 0) {
            clearInterval(checkBox.interval)
            return;
        }
        //todo
        render(index, checkBox.t)
        if (checkBox.t <= 50 && checkBox.isOn) {
            checkBox.isOn = false
            toggleColor(index, checkBox.isOn)
        }
        checkBox.t--
    }, stepDur)
}

function calcSelectorWidth(fraction/*0 - 100*/) {
    return `${minSelectorWidth + (fullSelectorWidth - minSelectorWidth) * (50 - Math.abs(fraction - 50)) / 50}px`
}

function render(index, t) {
    let checkBox = checkBoxes[index]
    checkBox.selector.style.width = calcSelectorWidth(t)
    if (checkBox.t > 50) {
        checkBox.selector.style.right = 0
        checkBox.selector.style.left = 'auto'
    } else {
        checkBox.selector.style.right = 'auto'
        checkBox.selector.style.left = 0
    }
}

function toggleColor(index, isOn) {
    let checkBox = checkBoxes[index]
    if (isOn) {
        checkBox.self.setAttribute("checked", "")
        checkBox.on.style.backgroundImage = `url( "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'><path stroke-width='5' stroke-linecap='round' stroke='%23044' fill='none' d='M25 45 v-40'/></svg>" )`
        checkBox.off.style.backgroundImage = `url( "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'><path stroke-width='5' stroke-linecap='round' stroke='cyan' fill='none' d='M25 45 a20 20 0 0 1 0 -40 a20 20 0 0 1 0 40'/></svg>" )`
    } else {
        checkBox.self.removeAttribute("checked")
        checkBox.on.style.backgroundImage = `url( "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'><path stroke-width='5' stroke-linecap='round' stroke='cyan' fill='none' d='M25 45 v-40'/></svg>" )`
        checkBox.off.style.backgroundImage = `url( "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'><path stroke-width='5' stroke-linecap='round' stroke='%23044' fill='none' d='M25 45 a20 20 0 0 1 0 -40 a20 20 0 0 1 0 40'/></svg>" )`
    }
}