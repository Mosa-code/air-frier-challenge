import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    guess: "",
    pin: "",
  });

  const [submitted, setSubmitted] = useState(false); // ✅ NEW

  const handleChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;
    if (name === "pin") {
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1-")
        .replace(/-$/, "");
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted form data:", formData);

    setSubmitted(true); // ✅ Show success message
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      guess: "",
      pin: "",
    }); // ✅ Clear form

    setTimeout(() => setSubmitted(false), 3000); // Hide message after 3 seconds
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-900 rounded-2xl p-8 w-full max-w-xl shadow-lg space-y-4"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Air Frier Interest Form
        </h1>

        {submitted && (
          <p className="text-green-400 text-center font-semibold">
            🎉 Form submitted successfully!
          </p>
        )}

        {[
          { name: "firstName", label: "First Name", type: "text" },
          { name: "lastName", label: "Last Name", type: "text" },
          { name: "phone", label: "Phone Number", type: "tel" },
          { name: "email", label: "Email Address", type: "email" },
          { name: "guess", label: "Guess the Air Fryer's Cost ($)", type: "number" },
          { name: "pin", label: "Very, very secret 16-digit Spidr PIN", type: "text" },
        ].map(({ name, label, type }) => (
          <div key={name}>
            <label className="block mb-1 font-semibold text-sm">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-rose-500 text-white"
              placeholder={label}
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-3 bg-rose-600 hover:bg-rose-700 rounded-lg text-white font-bold transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
