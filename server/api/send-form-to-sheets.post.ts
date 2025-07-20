export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const {
        firstName,
        lastName,
        attendance,
        transferHelp,
        drinks
    } = body

    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxqVwUOdjD3PUN0ukyrIq2mMYyPDdU1H6mXAYtdrd7vc2xh88ySoJXbKJypcX3qWDNjKA/exec'

    try {
        const res = await fetch(googleScriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                attendance,
                transferHelp,
                drinks
            })
        })

        const result = await res.json()

        return {
            success: result.result === 'success'
        }
    } catch (error) {
        console.error('Ошибка при отправке в Google Sheets:', error)
        return {
            success: false,
            error: 'Ошибка при отправке на сервер Google Sheets'
        }
    }
})
