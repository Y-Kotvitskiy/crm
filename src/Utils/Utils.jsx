const showPriceAmount = (price) => {
    if (price) {
        return (+price).toLocaleString(`en-US`,
            {
                style: 'currency',
                currency: `EUR`,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )
    }
    return null
}

const shrinkFieldValue = (value) => {
    const maxLength = 30;
    if (value && value.length > maxLength)
        return value.slice(0, maxLength) + `..`
    else
        return value
}


export { showPriceAmount, shrinkFieldValue }
