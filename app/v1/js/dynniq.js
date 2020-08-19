Aim.add(Host = {
	title: "Dynniq",
	App: {
		navleft: {
			items: {
				CRM11: {
					className: "crm", items: {
						"Contactpersonen": { className: "person", get: { "search": 1, lid: ";1004" } },
						"Organisaties": { className: "company", get: { "search": 1, lid: ";1002" } },
						"Mailgroupen": { get: { "search": 0, lid: ";1112" } }
					}
				},
				Website: {
					className: "website", items: {
						"Websites": { className: "website", get: { lid: ";1091" } },
						"Webpages": { className: "webpage", get: { lid: ";1092" } }
					}
				},
				Admin: {
					className: "config", items: {
						"Groups": { className: "crm", get: { "search": 0, lid: ";1103" } }
					}
				},
				Meer: { className: "folder", get: { "tv": 2, "lv": 1, "id": 0, "brd": 0 } }
			},
		},
	},
});
