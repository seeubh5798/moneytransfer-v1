export const Balance = ({ value }) => {
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold px-3 text-lg">
            Rs {value}
        </div>
    </div>
}