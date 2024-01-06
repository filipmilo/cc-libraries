import axios from "axios";
import { Form, redirect } from "react-router-dom"

export default function Register() {
  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="name"
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="surname"
        />
      </p>
      <label>
        <span>Address</span>
        <input
          type="text"
          name="address"
        />
      </label>
      <label>
        <span>Unique Citizen Identification Number</span>
        <input
          type="text"
          name="ucin"
        />
      </label>
      <p>
        <button type="submit">Save</button>
      </p>
    </Form>
  )
}

export async function registerAction({ request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  if (!updates.ucin) {
    alert("UCIN is required")
    return null;
  }

  const response = await axios.post("localhost:5431/api/register", updates);

  alert(response);

  return redirect(`/`);
}
