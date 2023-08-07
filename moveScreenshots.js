



const fs = require("fs");

const path = require("path");

const desktopDir = '/Users/admin/Desktop';
const screenshotDir = '/Users/admin/Desktop/screenShots';

fs.readdir(desktopDir, (err, files) => {

    if (err) {
        console.log(`Erorr ${err}`)
        return
    }
    files.forEach(file => {
        if (file.startsWith("Screenshot")) {
            const oldPath = path.join(desktopDir, file);
            const newPath = path.join(screenshotDir, file)

            fs.rename(oldPath, newPath, err => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`moved file ${file}`)
                }
            }
            )

        }
    })

}
)


