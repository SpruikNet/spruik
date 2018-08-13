function wait (time, shouldResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve()
      } else {
        reject()
      }
    }, time)
  })
}

function waitForResolve (time) {
  return wait(time, true)
}

function waitForReject (time) {
  return wait(time, false)
}

waitForResolve.resolve = waitForResolve
waitForResolve.reject = waitForReject

module.exports = waitForResolve
