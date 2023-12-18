import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAlbumById, updateAlbumById } from "../api/data.js";

const editTemplate = (a, onEdit) => html` <section id="edit">
  <div class="form">
    <h2>Edit Album</h2>
    <form class="edit-form" @submit=${onEdit}>
      <input
        type="text"
        name="singer"
        id="album-singer"
        value=${a.singer}
        placeholder="Singer/Band"
      />
      <input
        type="text"
        name="album"
        id="album-album"
        value=${a.album}
        placeholder="Album"
      />
      <input
        type="text"
        name="imageUrl"
        id="album-img"
        value=${a.imageUrl}
        placeholder="Image url"
      />
      <input
        type="text"
        name="release"
        id="album-release"
        value=${a.release}
        placeholder="Release date"
      />
      <input
        type="text"
        name="label"
        id="album-label"
        value=${a.label}
        placeholder="Label"
      />
      <input
        type="text"
        name="sales"
        id="album-sales"
        value=${a.sales}
        placeholder="Sales"
      />

      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export async function showEdit(ctx) {
  const album = await getAlbumById(ctx.params.id);

  ctx.render(editTemplate(album, onEdit));

  async function onEdit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log(".data.", data);

    if (
      !data.singer ||
      !data.album ||
      !data.release ||
      !data.imageUrl ||
      !data.label ||
      !data.sales
    ) {
      return;
    }

    try {
      await updateAlbumById(ctx.params.id, data);

      ctx.page.redirect("/edit/" + ctx.params.id);
    } catch (err) {
      console.log(err.message);
      return;
    }
  }
}
