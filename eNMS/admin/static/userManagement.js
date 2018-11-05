/*
global
alertify: false
call: false
doc: false
fCall: false
fields: false
users: false
*/

const table = $('#table').DataTable(); // eslint-disable-line new-cap

/**
 * Add user to datatable or edit line.
 * @param {mode} mode - Create or edit.
 * @param {user} user - Properties of the user.
 */
function addUser(mode, user) {
  let values = [];
  for (let i = 0; i < fields.length; i++) {
    values.push(`${user[fields[i]]}`);
  }
  values.push(
    `<button type="button" class="btn btn-info btn-xs"
    onclick="showUserModal('${user.id}')">Edit</button>`,
    `<button type="button" class="btn btn-info btn-xs"
    onclick="showUserModal('${user.id}', true)">Duplicate</button>`,
    `<button type="button" class="btn btn-danger btn-xs"
    onclick="deleteInstance('user', '${user.id}')">Delete</button>`
  );
  if (mode == 'edit') {
    table.row($(`#${user.id}`)).data(values);
  } else {
    const rowNode = table.row.add(values).draw(false).node();
    $(rowNode).attr('id', `${user.id}`);
  }
}

(function() {
  doc('https://enms.readthedocs.io/en/latest/security/access.html');
  for (let i = 0; i < users.length; i++) {
    addUser('create', users[i]);
  }
})();



/**
 * Create or edit user.
 */
function processData() { // eslint-disable-line no-unused-vars
  fCall('/update/user', '#edit-form', function(user) {
    const title = $('#title').text().startsWith('Edit');
    const mode = title ? 'edit' : 'create';
    addUser(mode, user);
    const message = `User '${user.name}'
    ${mode == 'edit' ? 'edited' : 'created'}.`;
    alertify.notify(message, 'success', 5);
    $('#edit').modal('hide');
  });
}
