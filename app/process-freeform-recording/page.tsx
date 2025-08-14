import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get("audio") as File
    const language = formData.get("language") as string
    const profession = formData.get("profession") as string

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 })
    }

    // Create FormData to send to Flask backend
    const backendFormData = new FormData()
    backendFormData.append("audio", audioFile)
    backendFormData.append("language", language)
    backendFormData.append("profession", profession)

    const backendResponse = await fetch("http://localhost:5000/api/process-freeform-audio", {
      method: "POST",
      body: backendFormData,
      headers: {
        // Include any auth headers if needed
        Authorization: request.headers.get("Authorization") || "",
      },
    })

    if (!backendResponse.ok) {
      throw new Error(`Backend responded with status: ${backendResponse.status}`)
    }

    const result = await backendResponse.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error processing free-form audio:", error)
    return NextResponse.json({ error: "Failed to process audio recording" }, { status: 500 })
  }
}
