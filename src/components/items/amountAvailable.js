const amountAvailable = (itemData, collectionDate, returnDate) => {
    let lowestAmountAvailable = itemData.quantity
    let amountAvailableForDay, amountBookedForDay
    if (itemData.bookings) {
        Object.keys(itemData.bookings).map(day => {
            let currentDayBookings = itemData.bookings[day]
            amountBookedForDay = 0
            Object.keys(currentDayBookings).map(bookingId => {
                amountBookedForDay += parseInt(currentDayBookings[bookingId])
            })
            amountAvailableForDay = itemData.quantity - amountBookedForDay
            if (amountAvailableForDay < lowestAmountAvailable) {
                lowestAmountAvailable = amountAvailableForDay
            }
        })

        return lowestAmountAvailable
    }
    return itemData.quantity
}

export default amountAvailable