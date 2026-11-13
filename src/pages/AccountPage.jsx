import { useState } from "react";
import {
  Heart,
  History,
  MapPin,
  Save,
  ShoppingBag,
  UserRound
} from "lucide-react";
import { Link } from "react-router-dom";

const profileFields = [
  { name: "fullName", label: "Full name", autoComplete: "name" },
  { name: "email", label: "Email address", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
  { name: "address", label: "Street address", autoComplete: "street-address", wide: true },
  { name: "city", label: "City", autoComplete: "address-level2" },
  { name: "region", label: "State or province", autoComplete: "address-level1" },
  { name: "postalCode", label: "Postal code", autoComplete: "postal-code" },
  { name: "country", label: "Country or region", autoComplete: "country-name" }
];

function emptyProfile() {
  return Object.fromEntries(profileFields.map(({ name }) => [name, ""]));
}

function ProfileField({ field, value, onChange }) {
  return (
    <label className={`block${field.wide ? " sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {field.label}
      </span>
      <input
        name={field.name}
        type={field.type || "text"}
        autoComplete={field.autoComplete}
        value={value}
        onChange={onChange}
        className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}

export default function AccountPage({
  profile,
  cartCount,
  wishlistCount,
  onSaveProfile,
  onClearProfile
}) {
  const [details, setDetails] = useState(profile);
  const [feedback, setFeedback] = useState("");

  const handleChange = (event) => {
    setDetails((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
    setFeedback("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFeedback(
      onSaveProfile(details)
        ? "Your details are saved on this device."
        : "Your details could not be saved. Check this browser's storage settings and try again."
    );
  };

  const handleClear = () => {
    if (onClearProfile()) {
      setDetails(emptyProfile());
      setFeedback("Saved details cleared.");
    } else {
      setFeedback("Saved details could not be cleared. Try again.");
    }
  };

  return (
    <main className="container-wide pb-24 pt-8 sm:pt-10">
      <div className="mb-6 flex items-center gap-4">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-blue-100 text-blue-700">
          <UserRound size={26} />
        </span>
        <div>
          <p className="text-sm font-semibold text-blue-700">Buyer account</p>
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">My account</h1>
        </div>
      </div>

      <p className="mb-6 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
        Profile and delivery details are saved only in this browser. They are not synced to an online account.
      </p>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <form
          onSubmit={handleSubmit}
          className="hover-surface rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-blue-700" />
            <h2 className="text-lg font-bold text-slate-900">Contact and delivery details</h2>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Save these details to prefill the checkout form on this device.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {profileFields.map((field) => (
              <ProfileField
                key={field.name}
                field={field}
                value={details[field.name]}
                onChange={handleChange}
              />
            ))}
          </div>

          {feedback && (
            <p role="status" className="mt-4 text-sm text-slate-700">
              {feedback}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              <Save size={16} />
              Save details
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-500"
            >
              Clear saved details
            </button>
          </div>
        </form>

        <aside className="space-y-4">
          <section className="hover-surface rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-slate-900">Shopping shortcuts</h2>
            <div className="mt-4 space-y-3">
              <Link to="/cart" className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm transition-transform hover:translate-x-1 motion-reduce:transition-none motion-reduce:transform-none">
                <span className="flex items-center gap-2 text-slate-700">
                  <ShoppingBag size={17} />
                  Shopping cart
                </span>
                <span className="font-semibold text-slate-900">{cartCount}</span>
              </Link>
              <Link to="/wishlist" className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm transition-transform hover:translate-x-1 motion-reduce:transition-none motion-reduce:transform-none">
                <span className="flex items-center gap-2 text-slate-700">
                  <Heart size={17} />
                  Wishlist
                </span>
                <span className="font-semibold text-slate-900">{wishlistCount}</span>
              </Link>
            </div>
          </section>

          <section className="hover-surface rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <History size={18} className="text-slate-500" />
              <h2 className="font-bold text-slate-900">Order history</h2>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Order history and tracking will appear here when order processing is connected.
            </p>
            <Link to="/track-order" className="mt-3 inline-block text-sm font-semibold text-blue-700 hover:underline">
              Order tracking information
            </Link>
          </section>
        </aside>
      </div>
    </main>
  );
}
