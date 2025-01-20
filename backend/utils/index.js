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

// sumanth : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdjMjU1YjgwOGEyYTE3YTRjZGEzZmYiLCJpYXQiOjE3MzYxODkzNDR9.gqehLad82XVriFbnvYRjJhQxduoMV1kiUjEXagwF92Y
// santhosh : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdjMjU2YTgwOGEyYTE3YTRjZGE0MDIiLCJpYXQiOjE3MzYxODkzMjR9.nHpcTSr2MPFqL7s7Z8kSpasJQXkdSR40oOGMM-VHD18
// sai : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdjYjcxNTlkZDYzYWY5MGY3ZTRjMGQiLCJpYXQiOjE3MzYyMjY2MDR9.CwF06AYkt7Kvho0EinSHz-YDd3Lff8PlYgaDubfwa34