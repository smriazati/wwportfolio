// stores/counter.js
import { defineStore } from 'pinia'

export const useActiveProjectStore = defineStore('activeProject', {
    state: () => {
        return {
            activeProject: {
                title: undefined,
                location: undefined
            },
            activeProjectType: undefined
        }
    },
    actions: {
        setActiveProject(title, location) {
            this.activeProject.title = title
            this.activeProject.location = location
        },
        clearActiveProject() {
            this.activeProject.title = undefined;
            this.activeProject.location = undefined;
        },
        setActiveProjectType(type) {
            this.activeProjectType = type
        },
        clearActiveProjectType() {
            this.activeProjectType = undefined
        }
    },
})