const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
		return {
			statusCode: 405,
			body: 'Method Not Allowed',
			headers: { Allow: 'POST' }
		}
  }
  
  const data = JSON.parse(event.body)
	if (!data.items || !data.collectionDate || !data.email || !data.returnDate || !data.collectionTime || !data.returnTime || !data.bookingId) {
		return { statusCode: 422, body: 'Selected, email, collection date, return date, collection time and return time are required.' }
  }

  console.log(data.items)

  let listItems = data.items.map(item => (
    `<li>${item.name} ---- quantity: ${item.quantity}</li>`
  ))

  let htmlListItems = listItems.join(" ")

  console.log(htmlListItems)
  
  const msg = {
		to: `${data.email}`,
		cc: 'hellosamchris@gmail.com',
		bcc: 'vicepresident.1@enginclub.com',
		from: 'logistics@enginclub.com',
		subject: `Engin Club: Booking Confirmation for ${data.collectionDate}`,
		text: `Engin Club Logistics: ${data.bookingId}`,
		html: `<div class="container" style="width: 90vw;margin: 50px auto;font-family: sans-serif;">
  <div class="header">
    <div class="logo" style="height: 50px;width: 100px;background-image: url(http://static1.squarespace.com/static/56b6f4247c65e4255b1b99cd/t/5e0869a38daefa6cb5bdf2ae/1579182831268/?format=1500w);background-size: contain;background-position: center center;background-repeat: no-repeat;margin: 0 auto;"></div>
    <h3>Booking Id: ${data.bookingId}</h3>
  </div>
  <div class="info">
    <p>Please collect your items on <b>${data.collectionDate} at ${data.collectionTime}</b> and return your items on <b>${data.returnDate} at ${data.returnTime}</b></p>
  </div>
  <div class="items">
    <h3>Items Borrowed</h3>
    <ol>
      ${htmlListItems}
    </ol>
  </div>
  <div class="footer">
    <p>Thank you for using Engin Club logistics. Receipt of this confirmation means that you are liable for damaged items.</p>
  </div>
</div><style>.logo {
  height: 50px;
  width: 100px;
  background-image: url("http://static1.squarespace.com/static/56b6f4247c65e4255b1b99cd/t/5e0869a38daefa6cb5bdf2ae/1579182831268/?format=1500w");
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  margin: 0 auto;
}

.container {
  width: 90vw;
  margin: 50px auto;
  font-family: sans-serif;
}
</style>`
	}
  
  return sgMail.send(msg).then(() => ({
    statusCode: 200,
    body: 'Message was sent!'
  })).catch(err =>  ({
    statusCode: 422,
    body: `Error: ${err}`
  })) 
}
