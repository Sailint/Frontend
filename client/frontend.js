import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'

new Vue({
    el: "#app",
    data() {
        return {
            form: {
                value: ''
            },
            occasions: [

            ]
        }
    },
    methods: {
        async createElement() {
            const occasion = {value: this.form.value}
            const newOccasion = await request('/api/occasions', 'POST', occasion)

            this.occasions.push(newOccasion)
            this.form.value = ''
        },
        async markOccasion(id) {
            const occasion = this.occasions.find( o => o.id === id)

            const updated = await request(`/api/occasions/${id}`, 'PUT', {
                marked: true
            })
            occasion.marked = updated.marked
        },
        async removeOccasion(id) {
            await request(`/api/occasions/${id}`, 'DELETE')
            this.occasions = this.occasions.filter( o => o.id !== id)
        }
    },
    async mounted() {
        let occasion_v = await request('/api/occasions') 
        this.occasions = occasion_v
    },
    async updated() {
        let occasion_v = await request('/api/occasions') 
        this.occasions = occasion_v
    }
})

async function request(url, method='GET', data=null) {
    const headers = {}
    let body

    if (data) {
        headers["Content-Type"]= "application/json"
        body = JSON.stringify(data)
    }

    const response = await fetch('http://localhost:3000' + url, {
        method,
        headers,
        body
    })
    return await response.json()
}