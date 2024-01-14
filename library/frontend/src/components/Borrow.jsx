import { Form } from "react-router-dom"

export default function Borrow() {
  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Book Name</span>
        <input
          placeholder="Book Name"
          type="text"
          name="bookName"
        />
      </p>
      <label>
        <span>Writer</span>
        <input
          type="text"
          name="address"
        />
      </label>
      <label>
        <span>ISBN</span>
        <input
          type="text"
          name="isbn"
        />
      </label>
      <label>
        <span>Date</span>
        <input
          type="text"
          name="date"
        />
      </label>
      <label>
        <span>UserId</span>
        <input
          type="text"
          name="userId"
        />
      </label>
      <p>
        <button type="submit">Save</button>
      </p>
    </Form>
  )
}

export async function borrowAction({ request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  if (!updates.userId) {
    alert("userId (UCIN) is required")
    return null;
  }

  const response = await axios.post(`http://${import.meta.env.VITE_ENDPOINT}/api/borrow`, updates);

  alert(JSON.stringify(response));

  return redirect(`/`);
}
