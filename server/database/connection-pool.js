'use strict';

const mysql = require('mysql2');
const db = require('../config/db');


const connectionPool = {

    pool: null,

    init: function(){
        console.log("initializing connection pool");
        this.pool=mysql.createPool(db);
    },

    getPool: function() {
        return this.pool;
    }
}
   

module.exports=connectionPool;
