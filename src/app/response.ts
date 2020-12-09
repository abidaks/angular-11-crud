export class Response {
  response: [
  	message: string,
  	data: [
	  id: number,
	  code: string,
	  name: string,
	  maximum_students: number,
	  status: string,
	  description: string,
	  created_at: Date,
	  updated_at: Date,
	  ]
  ]
  success: boolean
}