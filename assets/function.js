const mysql = require('mysql2'); //Importing mysql2
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'company_db'
    },
    console.log(connected to company_db)
);



//Update roles
const updateRole = (info) => {
    const sql = `UPDATE employee SET role = ? WHERE id = ?`
    const params = [info.newRole, info.employee]
    db.query(sql, params, (err, res) => {
        if (err) throw err;
        return;
    })
}

//Getting employee data
const getEmployees = () => {
    const employees = [];
    db.query(`SELECT e.id, e.first_name, e.lastname, roles.title AS job_title, roles.salary AS salary, dapartment.names AS department, CONCAT(m.first_name, ' ',m.last_name) AS manager FROM employee e LEFT JOIN roles ON role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee m ON e.manager_id =m.id`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            employees.push(row[i]);
        }
    });
    return employees;
}

//Adding new departments that I can access data from
const deptArrMain = () => {
    const deptArr = [];
    db.query(`SELECT * FROM department`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            deptArr.push({name:rows[i].name, value:rows[i].id});
        }
    });
    return deptArr;
}

//new department added to departments
const newDept = (info) => {
    const sql = `INSERT INTO department (names) VALUES ('$obj.name')`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        return;
    })
};