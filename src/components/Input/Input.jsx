
export const Input = ({ currencyData, getInputValue, getSelectValue, type, defaultCurrencies }) => {

    return (
        <div>
            <input type="text" onChange={e => getInputValue(e.target.value)} />
            <select 
                value={defaultCurrencies.number}
                onChange={e => getSelectValue(e.target.value)}
            >
                {currencyData.map(item => {
                    return (
                        <option key={item.number} value={item.number}>
                            {item.code}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}