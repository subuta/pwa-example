const endpoint = 'http://localhost:3000/api/hoge'

const render = (html) => {
  const body = document.body
  const $app = body.querySelector('#app')
  $app.innerHTML = html
}

fetch(endpoint)
  .then((res) => {
    if (res.status !== 200) throw new Error('Cache miss.')
    return res.text()
  })
  .then((text) => {
    render(`
        <p>
            Got response from API. response = <b>${text}</b> 
        </p>
    `)
  }).catch((err) => {
    console.log('err = ', err)
    render(`
            <p class="warn">
                Got error response from API. response = <b>${err.message}</b> 
            </p>
        `)
  })