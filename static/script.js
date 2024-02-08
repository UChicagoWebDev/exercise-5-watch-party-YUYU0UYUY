/* For index.html */

// TODO: If a user clicks to create a chat, create an auth key for them
// and save it. Redirect the user to /chat/<chat_id>
function createChat () {

}

/* For chat.html */

document.addEventListener('DOMContentLoaded', function () {
  const room_id = WATCH_PARTY_ROOM_ID
  clearChatMessages()
  getMessages(room_id)
})

// TODO: Fetch the list of existing chat messages.
// POST to the API when the user posts a new message.
// Automatically poll for new messages on a regular interval.
function postMessage () {
  return
}

function getMessages (room_id) {
  fetch(`/api/rooms/${room_id}/getmessages`, {
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

function clearChatMessages (room_id) {
  const chatBox = document.querySelector(".messages")
  chatBox.innerHTML = ""
}

function startMessagePolling () {

  return
}
