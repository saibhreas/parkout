# Git Repo Commands  
##  Proper sequence for workflow:  
* Beginning of day: 
  1 Check repository for any pull requests
  2 Check your Branch
    * From nameBranch:
        1 
        2 git add .
        3 git commit -m "say something meaningful"
        4 git push
        5 go to git hub an make a pull request to merge
    * git checkout main
            2 If necessary git:
           git pull origin main
           
    * git checkout your nameBranch
    * git checkout siobhanBranch
      git pull origin main

* End of day /end of module saves
  1 Check on: yourBranch
    * Bottom left of screen indicates branch
      clicking brings drop down to choose branch.
    * From nameBranch:
        1 git status
        2 git add .
        3 git commit -m "say something meaningful"
        4 git push
        5 git status
    * git checkout main
        1 git ls
        2 If necessary git:
           git pull origin main
           git remote -u
    * git checkout your nameBranch
    * git merge main

 