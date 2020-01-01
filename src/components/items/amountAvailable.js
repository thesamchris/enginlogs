const amountAvailable = (itemData, collectionDate, returnDate) => {
    let lowestAmountAvailable = itemData.quantity
    let amountAvailableForDay, amountBookedForDay
    if (itemData.bookings) {
        Object.keys(itemData.bookings).map(day => {
            let currentDayBookings = itemData.bookings[day]
            let currentDay = new Date(day)
            let minDate = new Date(collectionDate)
            let maxDate = new Date(returnDate)
            if(currentDay >= minDate && currentDay <= maxDate) {
                amountBookedForDay = 0
                Object.keys(currentDayBookings).map(bookingId => {
                    amountBookedForDay += parseInt(currentDayBookings[bookingId])
                })
                amountAvailableForDay = itemData.quantity - amountBookedForDay
                if (amountAvailableForDay < lowestAmountAvailable) {
                    lowestAmountAvailable = amountAvailableForDay
                }
            }
        })

        return lowestAmountAvailable
    }
    return itemData.quantity
}

export default amountAvailable