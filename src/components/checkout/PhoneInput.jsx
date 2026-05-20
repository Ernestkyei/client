function PhoneInput({ value, onChange, error }) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-2">Beneficiary Phone Number *</label>
      <input
        type="tel"
        placeholder="024XXXXXXX"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      <small className="text-gray-500">Enter the phone number that will receive the data</small>
    </div>
  );
}
export default PhoneInput;
