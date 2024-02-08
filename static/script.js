// Change name
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("updatename").addEventListener('click', function (event) {
    event.preventDefault()
    const nameTextArea = document.getElementById("nameText")
    const content = nameTextArea.value
    console.log(content)
    if (!content) {
      alert("No messages entered!!!!")
      return
    }
    const newname = {
      "name": content,
      "user_id": WATCH_PARTY_USER_ID
    }

    fetch(`/api/user/name`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WATCH_PARTY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newname)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json() // Assuming the API returns JSON data
      })
      .catch(error => console.error('There was a problem with your fetch operation:', error))
  })
  // Change password
  document.getElementById("updatepassword").addEventListener('click', function (event) {
    event.preventDefault()
    const passwordTextArea = document.getElementById("passwordText")
    const content = passwordTextArea.value
    console.log(content)
    if (!content) {
      alert("No messages entered!!!!")
      return
    }
    const newpassword = {
      "password": content,
      "user_id": WATCH_PARTY_USER_ID
    }

    fetch(`/api/user/password`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WATCH_PARTY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newpassword)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json() // Assuming the API returns JSON data
      })
      .catch(error => console.error('There was a problem with your fetch operation:', error))
  })
})

/* For index.html */

// TODO: If a user clicks to create a chat, create an auth key for them
// and save it. Redirect the user to /chat/<chat_id>
function createChat () {

}

/* For chat.html */

document.addEventListener('DOMContentLoaded', function () {
  clearChatMessages()
  getMessages()
  // startMessagePolling()
})

// TODO: Fetch the list of existing chat messages.
// POST to the API when the user posts a new message.
// Automatically poll for new messages on a regular interval.

function postMessage () {
  document.getElementById("postForm").addEventListener('submit', function (event) {
    event.preventDefault()
    const postTextArea = document.getElementById("postText")
    const content = postTextArea.value
    console.log(content)
    if (!content) {
      alert("No messages entered!!!!")
      return
    }
    const message_post = {
      "m_body": content,
      "user_id": WATCH_PARTY_USER_ID
    }

    fetch(`/api/rooms/${WATCH_PARTY_ROOM_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WATCH_PARTY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message_post)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json() // Assuming the API returns JSON data
      })
      .then(() => {
        // Clear the textbox
        postTextArea.value = ""
      }
      )
      .catch(error => console.error('There was a problem with your fetch operation:', error))
  })
}

function getMessages () {
  fetch(`/api/rooms/${WATCH_PARTY_ROOM_ID}/messages`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${WATCH_PARTY_API_KEY}`,
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json() // Assuming the API returns JSON data
    })
    .then(messages => {
      clearChatMessages()
      console.log("100ms polling")
      messages.forEach(message => {
        showMessage(message)
      })
    })
    .catch(error => console.error('There was a problem with your fetch operation:', error))
}

function showMessage (message) {
  const chatBox = document.querySelector(".messages")
  const messageDiv = document.createElement("message")
  const author = document.createElement("author")
  const content = document.createElement("content")
  content.textContent = message.m_body
  author.textContent = message.user_name
  messageDiv.appendChild(author)
  messageDiv.appendChild(content)
  chatBox.appendChild(messageDiv)
}

function clearChatMessages () {
  const chatBox = document.querySelector(".messages")
  chatBox.innerHTML = ""
}

function startMessagePolling () {
  setInterval(getMessages, 100)
}
