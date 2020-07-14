export const event = {
	Records: [
		{
			cf: {
				config: {
					distributionDomainName: "d4o956fvcjnex.cloudfront.net",
					distributionId: "E2CVWF1TXBFOCN",
					eventType: "origin-request",
					requestId: "8vY-klh5dEEe4qE35wqvGRkbSPa18eRrRM0UEttlYXYgfMS-LrDW5Q==",
				},
				request: {
					clientIp: "123.123.123.123",
					headers: {
						"x-forwarded-for": [
							{ key: "X-Forwarded-For", value: "123.123.123.123" },
						],
						"user-agent": [{ key: "User-Agent", value: "Amazon CloudFront" }],
						via: [
							{
								key: "Via",
								value:
									"1.1 d4fd24ae65d4d2b97cfdea8d2f0c21a6.cloudfront.net (CloudFront)",
							},
						],
						"accept-encoding": [{ key: "Accept-Encoding", value: "gzip" }],
						pragma: [{ key: "Pragma", value: "no-cache" }],
						"upgrade-insecure-requests": [
							{ key: "Upgrade-Insecure-Requests", value: "1" },
						],
						host: [
							{
								key: "Host",
								value: "ssr-demo.s3-website.eu-north-1.amazonaws.com",
							},
						],
						"cache-control": [{ key: "Cache-Control", value: "no-cache" }],
					},
					method: "GET",
					origin: {
						custom: {
							customHeaders: {},
							domainName: "ssr-demo.s3-website.eu-north-1.amazonaws.com",
							keepaliveTimeout: 5,
							path: "",
							port: 80,
							protocol: "http",
							readTimeout: 30,
							sslProtocols: ["TLSv1", "SSLv3"],
						},
					},
					querystring: "",
					uri: "/someroute",
				},
			},
		},
	],
};
