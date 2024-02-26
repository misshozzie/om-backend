
# OFFICEMATE

The Officemate is designed to cater to the needs of busy professionals and students by providing an organized digital environment for their daily tasks. It streamlines activities like event management, note-taking, and document conversion into PDF format, all within a unified platform. This centralization saves time and boosts productivity, making it ideal for individuals who prioritize efficiency and convenience in managing both personal and professional responsibilities.

The app aims to establish itself as an indispensable tool for time management and productivity enhancement. Its success will be gauged by user adoption rates, positive feedback on usability and functionality, as well as its ability to adapt to the changing requirements of its target audience through continuous improvement and updates.


## Technologies Used

* Node.js
* Express
* MongoDB


## Getting Started

### Prerequisites

Node.js
### Installation

1. Clone the repository

```bash
  git clone https://github.com/misshozzie/om-backend.git

```

2. Navigate to the project directory:

```bash
  cd officemate-backend

```

3. Install dependencies

```bash
 npm install

```
4. Create a .env file (if needed)

```bash
DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3
```

5. Run the application

```bash
npm start
```
## API Reference

#### User Endpoints

```http
  POST /api/user/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**.user's email |
| `password` | `string` | **Required**.user's password |


```http
  GET /api/user/profile/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Task Endpoints

```http
  POST /api/tasks/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Title of the task |
| `Description`      | `string` | **Optional**. Description |

```http
  GET /api/tasks/all
```

#### Note Endpoints

```http
  POST /api/tasks/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `content`      | `string` | **Required**. Content of the note |


```http
  GET /api/notes/all

```

#### Task Operations

```http
  POST /api/tasks/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Title of the task |
| `description`      | `string` | **Required**. Description of the task |

```http
  GET /api/tasks/all

```

#### Note Operations

```http
  POST /api/notes/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Title of the note |
| `description`   | `string` | **Optional**. Description of the note |
| `date`   | `string` | **Optional**. Date of the note |
| `isEvent`   | `boolean` | **Optional**. Specifies if the note is an event |

```http
 GET /api/notes/one/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the note to fetch |

```http
  PATCH /api/notes/${id}

```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the note to update |

```http
  DELETE /api/notes/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the note to delete |


```http
  GET /api/notes/all
```

## Lessons Learned

I've gained knowledge on integrating daos, controllers, models, and routes, enhancing my understanding of APIs and databases. This learning journey also included successfully connecting to Google Firebase, which broadened my technical skills and capabilities in backend development.

