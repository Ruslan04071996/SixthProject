console.log('worked');

const posts = [];
let nextId = 1;
const rootEl = document.getElementById('root');

const formEl = document.createElement('form');
formEl.className = 'form-inline mb-2';

formEl.innerHTML = `

<div class="container">
<div class="row">
<div class="col">
<div class="form-group">
<input type="text" class="form-control mb-2 " data-id="url" >
<input type="text" class="form-control mb-2" data-id="text">
<select  class="custom-select mb-2"  data-id="type">
<option value="regular">Обычный</option>
<option value="image">Изображение</option>
<option value="audio">Аудио</option>
<option value="video">Видео</option>
</select>
<button class="btn btn-primary mb-2" data-action="add">Ок</button>
</div>
</div>
</div>
</div>
`;

const typeEl = formEl.querySelector('[data-id=type]')
const urlEl = formEl.querySelector('[data-id=url]');
const textEl = formEl.querySelector('[data-id=text]')
formEl.addEventListener('submit', function (ev) {
    ev.preventDefault();

    const url = urlEl.value;
    const text = textEl.value;
    const type = typeEl.value;
    const post = {
        id: nextId++,
        url,
        text,
        likes: 0,
        type,
    };
    posts.push(post);
    typeEl.value = 'regular';
    // rebuildList(postsEl, posts);
    urlEl.value = '';
    textEl.value = '';
    posts.sort((a, b) => {
        return a.likes - b.likes;
    });
   
    rebuildList(postsEl, posts);
    urlEl.focus();
});

rootEl.appendChild(formEl);

const postsEl = document.createElement('ul');
postsEl.className = 'list-group';

rootEl.appendChild(postsEl);

function rebuildList(containerEl, items) {
    for (const child of Array.from(containerEl.children)) {
        containerEl.removeChild(child);
    }
    for (const item of items) {
        const el = document.createElement('li');
        el.className = 'list-group-item';
        el.dataset.id = 'post-${item.id}';//каким образом мы обращаемся к id
        if (item.type === 'image') {
            el.innerHTML = `
        <img src="${item.url}" class="rounded" width="100"  height="100">
        ${item.text}
        <span class="badge badge-secondary">${item.likes}</span>
        <button type="button" class="btn btn-primary btn-sm" data-action="like">like</button>
        <button type="button" class="btn btn-primary btn-sm" data-action="dislike">dislike</button>
        `;
        } else if (item.type === 'audio') {
            el.innerHTML = `
            <audio src="${item.url}" class="rounded" width="100" height="100" controls></audio>
            ${item.text}
            <span class="badge badge-secondary">${item.likes}</span>
            <button type="button" class="btn btn-primary btn-sm" data-action="like">like</button>
             <button type="button" class="btn btn-primary btn-sm" data-action="dislike">dislike</button>
            `;
        } else if (item.type === 'video') {
            el.innerHTML = `
            <video src="${item.url}" class="rounded" width="100" height="100" controls></video>
            ${item.text}
            <span class="badge badge-secondary">${item.likes}</span>
            <button type="button" class="btn btn-primary btn-sm" data-action="like">like</button>
            <button type="button" class="btn btn-primary btn-sm" data-action="dislike">dislike</button>
            `
        } else if (item.type === 'regular') {
            el.innerHTML = `
            <div class="rounded">${item.url}</div>
            ${item.text}
            <span class="badge badge-secondary">${item.likes}</span>
            <button type="button" class="btn btn-primary btn-sm" data-action="like">like</button>
            <button type="button" class="btn btn-primary btn-sm" data-action="dislike">dislike</button>
            `
        }
        el.querySelector('[data-action=like]').addEventListener('click', function (event) {
            item.likes++;
            items.sort(function (a, b) {
                return -(a.likes - b.likes);

            });
            rebuildList(containerEl, items)
        });
        el.querySelector('[data-action=dislike]').addEventListener('click', function (event) {
            item.likes--;
            items.sort(function (a, b) {
                return -(a.likes - b.likes);
            });
            rebuildList(containerEl, items)
        });
        containerEl.insertBefore(el, containerEl.firstElementChild);
    };


};