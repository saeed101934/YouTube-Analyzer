export default async function handler(req, res) {

  res.status(200).json({

    status: "success",

    app: "YouTube Analyzer AI",

    version: "1.0",

    message: "Backend Connected Successfully"

  });

}
