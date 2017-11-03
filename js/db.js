var currentLevel;
var levels = [
    {message: '', stat: 0},
    {message: 'will prefer "Steal honey from a bear" rather "From a beehive"?', stat: "29"},
    {message: 'will prefer to "Be considered annoying" instead of "Be considered boring"?', stat: "31"},
    {message: 'will prefer to "Listen to older music" instead of "New music"?', stat: "30"},
    {message: 'will prefer to be James Bond instead of Jason Bourne?', stat: "70"},
    {message: 'will choose option "never age" over "never die"?', stat: "63"},
    {message: 'will choose to "die from dehydration" instead "die from starvation"?', stat: "59"},
    {message: 'will want "To be a dragon" instead "Own a dragon"?', stat: "25"},
    {message: 'will choose "unable to see one day" over "go without phone for a month"?', stat: "58"},
    {message: 'will select "ability to control people" rather "ability to control the time"?', stat: "42"},
    {message: 'will prefer "Get 4 hours of sleep per night" Over "12 hours of sleep"?', stat: "42"},
    {message: 'will prefer "Have another brohter" instead "have another sister"?', stat: "38"},
    {message: 'will prefer "Kiss a jellyfish" than "Step on a crab"?', stat: "30"},
    {message: 'Do daily workout', stat: 8},
    {message: 'will like insents as food in the future', stat: 16},
    {message: 'will prefer "Swim in the sea with a shark" than "Walk in the jungle with a hungry lion"?', stat: 40},
    {message: 'will like to quit your job to study again?', stat: 35},
    {message: 'will like to "Jump in a pool of freezing water" rather "Pool of lava"?', stat: 59},
    {message: 'will like to "Drink coke" instead of "Drink pepsi"?', stat: 67},
    {message: 'will prefer to "Live in the mountains for a year" rather "Be in a jail for a year"?', stat: 73},
    {message: 'will choose "Two right feet" over "Two right hands"?', stat: 57},
    {message: 'will prefer to "Be in pyjamas all day" than "Be in suit all day"?', stat: 75},
    {message: 'will like to "Lick own foot" than "Lick someone elses"?', stat: 87},
    {message: 'will like to "Be in a room with 70 spiders for 10 min" instead of "Be in a room with 70 bees for 5 min"?', stat: 70},
    {message: 'will choose to go a year without video games for $500?', stat: 30},
    {message: 'will like to "Have christmas twice a year" rather "Have birthday twice a year"', stat: 53},
    {message: 'will like to "Have dream house" rather "Have dream car"', stat: 58},
    {message: 'will like to "Have the power of invisibility" instead of "Have the power of x-ray vision"', stat: 62},
    {message: 'will choose to "Watch tv all day" instead "Sleep all day"', stat: 57},
    {message: 'will choose to "Always say everything in their mind" instead "Never speak again"', stat: 73},
    {message: 'will prefer "Be 2 feet shorter" instead "Be 2 feet taller"', stat: 38},
    {message: 'will prefer "Live a day without electricity" rather "live a day without watching TV"', stat: 30},
    {message: 'will prefer to "Never read another book" instead "Never hear another song"', stat: 16},
    {message: 'will prefer to meet "Justin Bieber" instead of "Taylor Swift"', stat: 23},
    {message: 'will choose "Never watch basebll again" instead of "Never watch football again"', stat: 66},
    {message: 'will like to "Work in a group" instead of "Work alone"', stat: 54},
    {message: 'will prefer "Need glasses to see for away" rather "Need glasses to see close up"', stat: 39},
    {message: 'will like "Have the ability to teleport" rather "Have the ability to be invisible"', stat: 45},
    {message: 'will choose "Work for corporation" instead of "Self employeed"', stat: 30},
    {message: 'will like "To be a famous athlete" instead of "To be a famous actor"', stat: 40},
    {message: 'will like "To work for Google" instead of "Work for Apple"', stat: 60},
    {message: 'will like "To swim 4 hours daily" instead of "walk 4 hours daily"', stat: 32},
    {message: 'you think "Actually pee in swiming pool"', stat: 72},
    {message: 'will like "Eyes with video recording" rather "Ears with audio recording"', stat: 72},
    {message: 'will like "To be always overworked" rather "Never have anything to do"', stat: 26},
    {message: 'will like "To be famous footballer" rather "Famous cricketer"', stat: 86},
    {message: 'will prefer "Have no teeth" rather "Have no hair"', stat: 30},
    {message: 'will prefer "Have shark teeth" rather "Have no teeth"', stat: 86},
    {message: 'will choose "Win the Novel Prize" rather "Win an Oscar"', stat: 44},
    {message: 'will prefer "Be a bird" rather "Be a fish"', stat: 64},
    {message: 'will like "To be credited for the invention of internet" rather "Credited with the invention of wheel"', stat: 89},
    {message: 'will prefer "Expert in Kung Fu" rather "Expert in Muay Thai"', stat: 54},
    {message: 'will prefer "Run to win in Marathon" rather "Run to win in sprint"', stat: 43},
    {message: 'will prefer "Youtube" instead of "Facebook"', stat: 53},
    {message: 'will prefer "Youtube" instead of "Facebook"', stat: 53},
    
]

function createDb() {
    dbShell = window.openDatabase("dbbtn57", 2, "dbbtn1", 1000000);
    //run transaction to create initial tables
    dbShell.transaction(setupTable, dbErrorHandler);
}

//I just create our initial table - all one of em
function setupTable(tx) {
//    dbShell.transaction(function (tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS setting(id INTEGER PRIMARY KEY, theme, msg_id, appVersion)");
    tx.executeSql("CREATE TABLE IF NOT EXISTS levels(id INTEGER PRIMARY KEY, message, stat INTEGER, userresponse INTEGER, guessed INTEGER, completed INTEGER)");

    createSetting();

//    }, dbErrorHandler);

}

function createSetting() {
    dbShell.transaction(function (tx) {
        tx.executeSql("SELECT id, theme FROM setting WHERE id = ?", [1], function (tx, results) {
            if (results.rows.length == 0) {
                dbShell.transaction(function (tx) {
                    tx.executeSql("INSERT INTO setting(id,theme,msg_id) values(?,?,?)", [1, 'basic', 0]);
                }, dbErrorHandler);
                for (i = 1; i < levels.length; i++) {
                    tx.executeSql("INSERT INTO levels(id,message,stat,userresponse,completed) values(?,?,?,?,?)", [i, levels[i].message, levels[i].stat, '', 0]);
                }
            } else {
                // Check wheter necessary columns present
                // checkColumns();
//                tx.executeSql("SELECT count(id) As rowCount FROM levels", [], function (tx, res) {
//                    if (res.rows[0].rowCount < puzzle.length) {
//                        for (i = eval(res.rows[0].rowCount + 1); i < puzzle.length; i++) {
//                            var locked = 1;
//                            var ionly = 0;
//                            if (puzzle[i].initials_only !== undefined) {
//                                ionly = 1;
//                            }
//                            tx.executeSql("INSERT INTO levels(id,completed,answer,alphabts,locked,shown_full,for_date, only_initials) values(?,?,?,?,?,?,?,?)", [i, 0, puzzle[i].answer, puzzle[i].alphabts, locked, 'false', 'N/A', ionly]);
//                        }
//                    }
//                })

            }
        })
    }, dbErrorHandler);
}

function getProfileDtl(callback) {
    dbShell.transaction(function (tx) {
        tx.executeSql("SELECT * FROM setting WHERE id = ?", [1], function (tx, res) {
            var result = res.rows[0];
            callback(result);
            return;
        });
    }, dbErrorHandler);
}

// Update Current msg id in profile 
function updateLvlId(lvlId) {
    dbShell.transaction(function (tx) {
        tx.executeSql("UPDATE setting SET lvl_id = ? WHERE id = ?", [lvlId, 1], function (tx, res) {
            return 'done';
        });
    }, dbErrorHandler);
}

function markLvlComplete() {
    dbShell.transaction(function (tx) {
        tx.executeSql("UPDATE levels SET completed = ? WHERE id = ?", [1, currentLevel.id], function (tx, res) {
            readyNext = true;
            return 'done';
        });
    }, dbErrorHandler);
}

function getLvlDtl(lvlId, callback) {
    dbShell.transaction(function (tx) {
        tx.executeSql("SELECT * FROM levels WHERE id = ?", [lvlId], function (tx, res) {
            var result = res.rows[0];
            callback(result);
            return;
        });
    }, dbErrorHandler);
}

function getNextLvl(callback) {
    dbShell.transaction(function (tx) {
        tx.executeSql("SELECT * FROM levels WHERE completed = ? Order by id ASC LIMIT 1", [0], function (tx, res) {
            var result = res.rows[0];
            currentLevel = res.rows[0];
            callback(result);
            return;
        });
    }, dbErrorHandler);
}

function updateGuess(lvlId, gf) {
    dbShell.transaction(function (tx) {
        tx.executeSql("UPDATE levels SET guessed = ? WHERE id = ?", [gf, lvlId], function (tx, res) {

        });
    }, dbErrorHandler);
}

function getGFCount(gf, modalSkeleton) {
    dbShell.transaction(function (tx) {
        tx.executeSql("SELECT COUNT(id) AS recCount FROM levels WHERE guessed = ?", [gf], function (tx, res) {
            var result = res.rows[0];
            if (gf === 1)
                $(modalSkeleton).find('.gir').html(result.recCount);
            if (gf === 0)
                $(modalSkeleton).find('.mtg').html(result.recCount);
        });
    }, dbErrorHandler);
}

function dbErrorHandler(err) {
    console.log("DB Error: " + err.message + "\nCode=" + err.code);
}