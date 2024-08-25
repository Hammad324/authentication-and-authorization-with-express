import { app } from './app.js'

app.listen(process.env.PORT || 3000, () => {
    console.log(`The app is running on port: ${process.env.port || 3000}`)
})