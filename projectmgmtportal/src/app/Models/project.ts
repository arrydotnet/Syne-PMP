export interface iProject {
    _id: string;
    project_id: string;
    project_name: string;
    desc: string;
    completed: boolean;
    startdate: string;
    enddate: string;
    allocated?: boolean;//Only for project allocation no db save
    hasUserStory?: boolean; 
}
//projectAllocation
export interface iAllocatedProject {
    project_id: string;
    employeeID: string;
}
//projectUserStories
export interface iUserStory {
    _id: string;
    storyID: number;
    projectID: string;//ObjectId
    story_title: string;
    desc: string;
    completed: boolean;
    startdate: string;
    enddate: string;
    storyPoints: number;
}
//UserStoryTasks
export interface iTask {
    _id: string;
    projectID: string;//ObjectId
    storyID: string;
    task_title: string;
    desc: string;
    completed: boolean;
    startdate: string;
    enddate: string;
    assignedTo: string;
}