
$(function() {

  $('#addBtn').on('click', event => {
    // event.preventDefault();
    console.log('button clicked');
    let newBurger = {
      name: $('#burName').val().trim(),
      devoured: false
    };

    console.log(newBurger);

    $.ajax('/api/burgers', {
      type: 'POST',
      data: newBurger
    }).then( () => {
        console.log('Create new burger!');
        location.reload();
    });
  });


  $('.devour-btn').on('click', function(event) {
    console.log('button clicked!');
    let id = $(this).data('id');
    let newDevour = $(this).data('newdevour');
    console.log('this time newDevour = ', newDevour);

    let newDevourState = '';
    if (newDevour) {
      newDevourState = {
        devoured: false
      }
    } else {
      newDevourState = {
        devoured: true
      }
    };


    console.log(newDevourState);

    $.ajax('/api/burgers/' + id, {
      type: 'PUT',
      data: newDevourState
    }).then(() => {
      console.log('changed devoured to ', newDevour);
      location.reload();
    });
  });

  $('.delete-btn').on('click', function(event) {
    console.log('deleting!');
    let id = $(this).data('id');

    $.ajax('/api/burgers/' + id, {
      type: 'DELETE',
    }).then( () => {
      console.log('deleted cat', id);
      location.reload();
    });
  });


});
