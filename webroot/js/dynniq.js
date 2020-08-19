aim.extend({
	api:{
		info:{
			title:"Dynniq",
        },
    },
	om: {
		nav: {
			items: {
				Admin: {
					className: "admin", items: {
						"Publish": { href: "#/admin/publish" },
					}
				},
    			CRM: {
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
            },
		},
	},
});
