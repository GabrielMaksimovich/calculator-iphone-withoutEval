let a = '' //first number
let b = '' //second number
let sign = '' //sign of operation
let finish = false

const digit = ['0','1','2','3','4','5','6','7','8','9','.']
const action = ['-','+','x','/','%']

// desktop
let out = document.querySelector('.calc-screen p')

function clearAll() {
     a = '' //first number
     b = '' //second number
     sign = '' //sign of operation
     finish = false
        setScreenInputValue(0)
}
// -- CODE STYLE
// 1. Segregate code into functions
// 2. Use constant for empty value or function
function hasEmptyValue(val) {
    return val === ''
}
function setScreenInputValue(value) {
   out.textContent = value
}
function isDigit(key) {
    return digit.includes(key)
}
function calcPercent(number,percent) {
    return number * percent / 100
}

document.querySelector('.buttons').onclick = (event) => {
        if(!event.target.classList.contains('btn')) return
        if(event.target.classList.contains('ac')) return

       setScreenInputValue('')

        const key = event.target.textContent
        //if click from 0-9
        if(isDigit(key)) {
            if (hasEmptyValue(b) && hasEmptyValue(sign)) {
                a += key
                if (a[0] === '0' && (a[1] && a[1] !== '.')) {
                    // out.textContent = a
                    a =  parseInt(a)
                    setScreenInputValue(a)
                } else {
                    setScreenInputValue(a)
                }

                console.log(a)
            } else if ( a!== '' && b!== '' && finish) {
                b = key
                finish = false
                setScreenInputValue(b)
            }
            else {
                b += key
                setScreenInputValue(b)
            }
            return;
        }

        //if click on digit -,+,*,/
        if(action.includes(key)) {
            sign = key
            setScreenInputValue(sign)
        }

        if( key === '%') {
            if(hasEmptyValue(b)) {
                a = calcPercent(a,1)
                setScreenInputValue(a)
                sign = ""
            } else {
                if( b !== '' && a !== ''  ) {
                    a = calcPercent(a,b)
                    setScreenInputValue(a)
                }
            }

        }

        // for +/- key pressed
        if(key === '+/-') {
            if ( a !== '') {
                b = -b
                setScreenInputValue(b)
            } else {
                a = -a
                setScreenInputValue(a)
            }
        }

        //if click on '='
        if ( key === '=') {
            if(b === '') b=a
            switch (sign) {
                case "+":
                    a = (+a) + (+b);
                    break;
                case "-":
                    a = a - b;
                    break;
                case "x":
                    a = a * b;
                    break;
                case "/":
                    if ( b == '0') {
                        setScreenInputValue('Error')
                        a = ''
                        b = ''
                        sign = ''
                        return
                    }
                    a = a / b
                    break;
            }
            finish = true
            setScreenInputValue(a)
        }
}