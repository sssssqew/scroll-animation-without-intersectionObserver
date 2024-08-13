let aosElements = [...document.querySelectorAll('.aos')]



// top 이 window.innerHeight 과 같으면 top - window.innerHeight 은 0이다. 
// 즉, 요소의 상단이 브라우저 하단에 걸쳐있으면 (보이기 직전) 차이는 0이다.
// 스크롤을 내려서 요소 상단이 브라우저 하단보다 위에 있으면 top - window.innerHeight 은 음수값이 된다.
// top - window.innerHeight < distanceFromTop : 해당 의미는 요소의 상단이 브라우저 하단보다 300px 만큼 위로 올라온 시점이다.
// 즉, 요소가 브라우저에서 보이기 시작한 시점에서 300px만큼 더 올라간 시점이다. 그때 isVisible 을 true 로 반환한다.

// top - window.innerHeight : 요소가 브라우저 하단보다 아래에 있으면 양수, 요소가 브라우저 하단보다 위에 있으면 음수
function scanElements(e){
    console.count(e) // 스크롤 횟수
    aosElements.forEach(element => {
        // console.log(element.getBoundingClientRect())
        if(isVisible(element)){
            element.classList.add('active')
        }else{
            element.classList.remove('active')
        }
    })
}

function isVisible(element){
    const top = element.getBoundingClientRect().top 
    const distanceFromTop = -300
    return top - window.innerHeight < distanceFromTop ? true : false 
}

function throttle(fn, delay){
    let lastCall = 0 // 마지막으로 스크롤한 시점
    return (...args) => {
        let context = this 
        let current = new Date().getTime() // 현재시간(ms)
        
        if(current - lastCall < delay) return // 마지막으로 스크롤한 시점과 현재 스크롤한 시점간의 시각차가 delay 보다 작은 경우 함수 실행하지 않음
        lastCall = current // 마지막으로 스크롤한 시점 업데이트
        return fn.apply(context, ...args) // delay 보다 큰 주기로 스크롤해야 주어진 함수(scanElements) 실행 
    }
}

// lodash 같은 라이브러리를 사용하여 throttling 가능
window.addEventListener('scroll', throttle(scanElements, 50)) // 최소 (아무리 짧아도) 50ms 간격으로 스크롤하도록 스크롤 횟수 제한