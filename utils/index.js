const fs = require('fs')
const path = require('path')

const insertDB = async (data, filename) => {
    const filepath = path.join(__dirname, `../model/${filename}.json`)
    const write = await fs.writeFileSync(filepath, JSON.stringify(data, null, 2))
    return `Data Added Successfully`
}

module.exports = {
    insertDB
}


// sai : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZGI1NWM0Yi0zNGViLTQ1YzktOGZhZi03YzYwOTVhYWU5OGYiLCJpYXQiOjE3MzU3NDAzNzh9.bHfSi93VI2OJgvvp5UhEYhCzIQPtaLAhVtjxBPY-o_U
// sumanth : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZmI2NzNjMS1jOGQ1LTQyN2ItOGMyYy1mMzVmYWU4YjEwOGQiLCJpYXQiOjE3MzU3NDA0MDB9.1fzSplYZuMxcIwqXHCDFqJ007a_YqvnvIa9o0d5OCHg