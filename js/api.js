aim = {
    info: {
        title: "Dynniq",
        description: ".",
        termsOfService: "http://aliconnect.nl/terms/",
        contact: { email: "max.van.kampen@alicon.nl" },
        license: { name: "Apache 2.0", url: "http://www.apache.org/licenses/LICENSE-2.0.html" },
        version: "1.0.2"
    },
    css: {
        rules: {
            ".row.top.bar": "background: linear-gradient(to right, #e6234b, #f07d00); color:white;"
        }
    },
    externalDocs: { description: "Find out more about Aliconnect", url: "https://aliconnect.nl" },
    servers: [ { url: "https://dynniq.aliconnect.nl/api" } ],
    tags: [],
	paths: {},
	components: {
        schemas: {
            "Company": aim.components.schemas.Company,
            "Contact": aim.components.schemas.Contact,
            "Website": aim.components.schemas.Website,
            "Webpage": aim.components.schemas.Webpage,
            "Task": aim.components.schemas.Task,
            "Map": aim.components.schemas.Map,
            "System": aim.components.schemas.System,
        }
    },
    om: {
        nav: {
            items: {
                "Start": { className: "start", href: "#/start()", items: {
                    "Favorieten": { className: "fav", href: "#/fav()" },
                    "Recent": { className: "History", href: "#/his()" },
                    "Gedeeld": { className: "group", href: "#/shared()" },
                    "Prullenbak": { className: "trash", href: "#/trash()" },
                }},
                "Website": { className: "Website", items: {
                    "Web sites": { className: "WebSite", href: "#/Website?filter=hostID<>1" },
                    "Web pages": { className: "WebPage", href: "#/Webpage?filter=hostID<>1" },
                    "Help pages": { className: "HelpPage", href: "#/Helppage" },
                }},
                "Organisatie": { className: "crm", items: {
                    "Contacts": { className: "person", href: "#/Contact?filter=hostID ne 1" },
                    "Companies": { className: "company", href: "#/Company?filter=hostID ne 1" },
                }},
                // SCADA: {
                // 	title: "SCADA", className: "scada", items: {
                // 		Alerts: { className: "alert", get: { title: "Alerts", folder: "alert", filter: "hostID<>1", q: "*", id: "" } },
                // 	}
                // },
                "Engineering": { className: "se", items: {
                    "Signal": { className: "signal", href: "#/Signal" },//get: { folder: 'signal', filter: "hostID<>1", q: '', id: '', title: 'Signals' } },
                    "SoftwareFunction": { className: "softwarefunction", href: "#/SoftwareFunction" },//get: { folder: 'softwarefunction', filter: "hostID<>1", q: '', id: '', title: 'Software functies' } },
                    "Instruments": { href: "#/Signal" },//q: '' } },
                    "Products": { href: "#/System?filter=hostID<>1+AND+srcID=masterID+AND+id+NOT+IN+(SELECT+masterID+FROM+api.items+WHERE+masterid=srcid)" },//folder: 'system', filter: "hostID<>1+AND+srcID=masterID+AND+id+NOT+IN+(SELECT+masterID+FROM+api.items+WHERE+masterid=srcid)", q: '' } },
                    "Systems": { href: "#/System" },//folder: 'System', filter: "hostID<>1", q: '' } },
                    "IO": { href: "#/IO" },//filter: "hostID<>1", q: '' } },
                    "Document": { className: "document", href: "#/Document" },//get: { folder: 'document', filter: "hostID<>1", q: '', id: '', title: 'Documenten' } },
                    //Asset: { get: { folder: 'product', href: "#/System" },//filter: "hostID<>1", q: '' } },
                    "Locations": { className: "location", href: "#/Location" },//get: { folder: 'location', filter: "hostID<>1", q: '', id: '', title: 'Locations' } },
                }},
                "Work": { className: "taskboard", items: {
                    "Taken": { className: "task", href: "#/Task" },//get: { folder: 'task', filter: "hostID<>1", q: '', id: '', title: 'Taken' } },
                    "Mijn taken": { className: "task", href: "#/Task?filter=ownerID+eq+me" },//get: { folder: 'task', filter: "hostID<>1+AND+ownerID=" + Aim.userID, q: '', id: '', title: 'Mijn taken' } },
                    "Alicon support": { className: "support", href: "#/Task?filter=ownerID+eq+support" },//get: { folder: 'task', filter: "hostID<>1+AND+ownerID=2753253", q: '', id: '', title: 'Support taken' } },
                }},
                "Admin": { className: "config", items: {
                    "Groups": { className: "crm", href: "#/groups" },//get: { folder: 'groups', q: '', id: '', title: 'Groepen' } },
                    "Keys": { className: "keys", href: "#/keys" },//get: { folder: 'keys', q: '', id: '', title: 'Keys' } },
                    "License": { className: "License", href: "#/License" },//get: { folder: 'License', q: '', id: '', title: 'License' } },
                }},
            },
        },
    },
}
